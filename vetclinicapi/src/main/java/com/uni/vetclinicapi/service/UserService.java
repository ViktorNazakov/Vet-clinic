package com.uni.vetclinicapi.service;

import com.uni.vetclinicapi.persistance.entity.Pet;
import com.uni.vetclinicapi.persistance.entity.Role;
import com.uni.vetclinicapi.persistance.entity.User;
import com.uni.vetclinicapi.persistance.repository.PetRepository;
import com.uni.vetclinicapi.persistance.repository.UserRepository;
import com.uni.vetclinicapi.presentation.exceptions.InvalidAuthoritiesException;
import com.uni.vetclinicapi.presentation.exceptions.PetAlreadyExistsException;
import com.uni.vetclinicapi.presentation.exceptions.PetNotFoundException;
import com.uni.vetclinicapi.presentation.exceptions.UserNotFoundException;
import com.uni.vetclinicapi.service.dto.FullPetDTO;
import com.uni.vetclinicapi.service.dto.UserInfoDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.function.BiConsumer;

/**
 * This service is used to load user by username from database.
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PetRepository petRepository;

    private final ModelMapper modelMapper;

    @Override
    public User loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with username %s not found!", username)));
        log.info("User with username : {}, was successfully fetched!", username);
        return user;
    }

/*    *//**
     * Sets the current logged user to an existing pet, which isn't owned by anybody.
     *
     * @param petId - the id of the pet.
     * @return - FullPetDTO with all the information about the given pet.
     *//*
    public FullPetDTO addPetToUser(UUID petId) {
        Pet petToAddToUser = petRepository.findById(petId).orElseThrow(() -> {
            log.warn("Attempted to fetch pet with id : {}, which doesn't exist.", petId);
            throw new PetNotFoundException(String.format("Pet with id : %s doesn't exist!", petId));
        });
        if (petToAddToUser.getUser() != null) {
            log.warn("Attempted to add to profile pet with id : {}, which is already owned by another user.", petId);
            throw new PetAlreadyExistsException(String.format("Attempted to add to profile Pet with id : %s, which is already owned by another user!", petId));
        }
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        petToAddToUser.setUser(user);
        Pet updatedCar = petRepository.save(petToAddToUser);
        log.info("Successfully added and saved owner (user) with id : {}, to pet with id : {}.", user.getId(), petId);
        return modelMapper.map(updatedCar, FullPetDTO.class);
    }*/

    /**
     * Returns currently logged-in user's info.
     *
     * @return - UserInfoDTO with all the information about the user.
     */
    public UserInfoDTO getLoggedUserInfo() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return modelMapper.map(user, UserInfoDTO.class);
    }

    /**
     * Returns a list with all users.
     *
     * @return - List of UserInfoDTO with all the information about a user.
     */
    public List<UserInfoDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> modelMapper.map(user, UserInfoDTO.class)).toList();
    }

    /**
     * Deletes a user - Returns the deleted user.
     * Checks if user with such id exists.
     *
     * @param userId - the id of the user to delete.
     * @return - UserInfoDTO object, containing all the information about the deleted User entity.
     */
    public UserInfoDTO deleteUser(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> {
            log.warn("Attempted to delete a User with id: {} , which does not exist.", userId);
            throw new UserNotFoundException(String.format("User with id: %s does not exist!", userId));
        });

        userRepository.deleteById(user.getId());
        log.info("User with details : {}, was deleted!", user);
        return modelMapper.map(user, UserInfoDTO.class);
    }

    /**
     * Updates a user's property - Returns the updated user.
     * Checks if user with such id exists.
     * Checks which property is changed.
     *
     * @param userId - the id of the user to update.
     * @return - UserInfoDTO object, containing all the information about the updated User entity.
     */
    public UserInfoDTO updateUserProperty(UUID userId, UserInfoDTO userInfoDTO) {
        User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userId).orElseThrow(() -> {
            log.warn("Attempted to update a User with id: {} , which does not exist.", userId);
            throw new UserNotFoundException(String.format("User with id: %s does not exist!", userId));
        });
        if (!loggedUser.getId().equals(userId) && !loggedUser.getAuthorities().contains(Role.RoleType.ADMIN)) {
            log.warn("Attempted to update a User with id: {} , but currently logged User does not have the authority.", userId);
            throw new InvalidAuthoritiesException(String.format("User with id: %s cannot be updated, because currently logged User does not have the authority!", userId));
        }
        updatePropertyIfNotNull(user,userInfoDTO.getFName(),User::setFName);
        updatePropertyIfNotNull(user,userInfoDTO.getLName(),User::setLName);
        updatePropertyIfNotNull(user,userInfoDTO.getPhoneNumber(),User::setPhoneNumber);

        User persistedUser = userRepository.save(user);

        log.info("User with details : {}, was updated!", user);
        return modelMapper.map(persistedUser, UserInfoDTO.class);
    }

    private <T> void updatePropertyIfNotNull(User user, T value, BiConsumer<User, T> setter) {
        if (value != null) {
            setter.accept(user, value);
        }
    }
}
