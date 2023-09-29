package com.uni.vetclinicapi.service;

import com.uni.vetclinicapi.persistaence.entity.Pet;
import com.uni.vetclinicapi.persistaence.entity.User;
import com.uni.vetclinicapi.persistaence.repository.PetRepository;
import com.uni.vetclinicapi.persistaence.repository.UserRepository;
import com.uni.vetclinicapi.service.dto.PetDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

    /**
     * Sets the current logged user to an existing car, which isn't owned by anybody.
     *
     * @param carId - the id of the car.
     * @return - FullCarDTO with all the information about the given car.
     */
/*    public PetDTO addPetToProfile(Integer carId, PetDTO preServiceDescriptionDTO) {
        Pet petToAddToProfile = petRepository.findById(carId).orElseThrow(() -> {
            log.warn("Attempted to fetch car with id : {}, which doesn't exist.", carId);
            throw new PetNotFoundException(String.format("Car with id : %s doesn't exist!", carId));
        });
        if (petToAddToProfile.getUser() != null) {
            log.warn("Attempted to add to profile car with id : {}, which is already owned by another user.", carId);
            throw new CarIsTakenException(String.format("Attempted to add to profile Car with id : %s, which is already owned by another user!", carId));
        }
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        petToAddToProfile.setPreServiceDescription(preServiceDescriptionDTO.getPreServiceDescription());
        petToAddToProfile.setUser(user);
        Pet updatedCar = carRepository.save(carToAddToProfile);
        log.info("Successfully added and saved pre service description and owner (user) with id : {}, to car with id : {}.", user.getId(), carId);
        return modelMapper.map(updatedCar, FullCarDTO.class);
    }*/
}
