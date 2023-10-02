package com.uni.vetclinicapi.service;

import com.uni.vetclinicapi.persistaence.entity.Pet;
import com.uni.vetclinicapi.persistaence.entity.User;
import com.uni.vetclinicapi.persistaence.repository.PetRepository;
import com.uni.vetclinicapi.presentation.exceptions.PetAlreadyExistsException;
import com.uni.vetclinicapi.presentation.exceptions.PetNotFoundException;
import com.uni.vetclinicapi.service.dto.FullPetDTO;
import com.uni.vetclinicapi.service.dto.PetDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Provides the necessary methods regarding CRUD operations with Car Entities.
 * Uses the CarRepository as a connection with the database.
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class PetService {

    private final PetRepository petRepository;

    private final ModelMapper modelMapper;

    /**
     * Checks if a Pet with name and owner like the one of PetDTO exists.
     * If it doesn't, Pet entity is created.
     * Else throws Pet already exists exception.
     *
     * @param petDTO - Pet data coming from request.
     * @return - FullPetDTO object, containing all the information for the Pet Entity.
     */

    public FullPetDTO create(PetDTO petDTO) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        boolean exists = petRepository.findAllByUser(user).stream().anyMatch(pet -> pet.getName().equals(petDTO.getName()));
        if (exists) {
            throw new PetAlreadyExistsException(String.format("Pet with the same name: %s and owner: %s already exists!", petDTO.getName(),user.getUsername()));
        }

        Pet pet = modelMapper.map(petDTO, Pet.class);
        pet.setUser(user);
        Pet persistedPet = petRepository.save(pet);
        log.info("Pet with details : {}, was created!", pet);
        return modelMapper.map(persistedPet, FullPetDTO.class);
    }

    /**
     * Delivers partial number of FullCarDTOs after making a request to the database and mapping those Car entities to a FullCarDTO object.
     *
     * @param pageIndex - page to be filled.
     * @param pageSize  - size of the page ( number of required objects in the collection ).
     * @return - pageSize number of Entities mapped to objects.
     */
//    public Page<FullCarDTO> findAll(int pageIndex, int pageSize) {
//        if (pageIndex < 0 || pageSize < 0) {
//            log.warn("Attempted to fetch page index : {} and page size : {}, which are out of bounds.", pageIndex, pageSize);
//            throw new InvalidPagePropertiesException("The index of the page should be >= 0 and the page size should be > 0");
//        }
//        Page<FullCarDTO> fullCarDTOList = new PageImpl<>(
//                carRepository.findAll(PageRequest.of(pageIndex, pageSize))
//                        .stream()
//                        .map(car -> modelMapper.map(car, FullCarDTO.class))
//                        .collect(Collectors.toList()));
//        if (fullCarDTOList.isEmpty()) {
//            log.info("There are no Cars present in database!");
//        } else {
//            log.info("{} number of Cars, have been fetched from database.", fullCarDTOList.getTotalElements());
//        }
//        return fullCarDTOList;
//    }

    /**
     * Changes the status of Car to Serviced.
     * Checks if car with such id exists.
     * Checks if car is already in service.
     *
     * @param carId - the id of the car we want to put into service.
     * @return - FullCarDTO object, containing all the information for the Car Entity.
     */
//    public FullCarDTO putCarIntoService(Integer carId) {
//        Car carToPutIntoService = carRepository.findById(carId).orElseThrow(() -> {
//            log.warn("Attempted to fetch car with id : {}, which doesn't exist.", carId);
//            throw new CarNotFoundException(String.format("Car with id : %s doesn't exist!", carId));
//        });
//        if (carToPutIntoService.isServiced()) {
//            log.warn("Attempted to put in service car with id : {}, which is already in service.", carId);
//            throw new CarAlreadyInServiceException(String.format("Attempted to put into service Car with id : %s, which is already in service!", carId));
//        }
//        carToPutIntoService.setServiced(true);
//        Car updatedCar = carRepository.save(carToPutIntoService);
//        log.info("Car with id : {}, was successfully put into service!", carId);
//        return modelMapper.map(updatedCar, FullCarDTO.class);
//    }

    /**
     * Changes the status of Car to not serviced - Returns the car to the owning user.
     * Checks if car with such id exists.
     * Checks if car is already out of service.
     *
     * @param  - the id of the car we want to put into service.
     * @return - FullCarDTO object, containing all the information for the Car Entity.
     */
//    public FullCarDTO returnCarToOwner(Integer carId, PostServiceDescriptionDTO postServiceDescriptionDTO) {
//        Car carToReturnToOwner = carRepository.findById(carId).orElseThrow(() -> {
//            log.warn("Attempted to fetch car with id : {}, which doesn't exist.", carId);
//            throw new CarNotFoundException(String.format("Car with id : %s doesn't exist!", carId));
//        });
//        if (!carToReturnToOwner.isServiced()) {
//            log.warn("Attempted to get out of service car with id : {}, which is already out of service.", carId);
//            throw new CarAlreadyOutOfServiceException(String.format("Attempted to get out of service Car with id : %s, which is already out of service!", carId));
//        }
//        carToReturnToOwner.setServiced(false);
//        carToReturnToOwner.setPostServiceDescription(postServiceDescriptionDTO.getPostServiceDescription());
//        Car updatedCar = carRepository.save(carToReturnToOwner);
//        log.info("Car with id : {}, was successfully returned to owner!", carId);
//        return modelMapper.map(updatedCar, FullCarDTO.class);
//    }


    public List<FullPetDTO> findAllPetsForUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<FullPetDTO> fullPetDTOList = petRepository.findAllByUser(user)
                .stream()
                .map(pet -> modelMapper.map(pet, FullPetDTO.class)).toList();
        if (fullPetDTOList.isEmpty()) {
            log.info("There are no Pets present in database!");
        } else {
            log.info("{} number of Pets for user with id : {}, have been fetched from database.", fullPetDTOList.size(), user.getId());
        }
        return fullPetDTOList;
    }

    /**
     * Deletes a pet from a user - Returns the deleted pet.
     * Checks if pet with such id exists.
     *
     * @param petId - the id of the pet we want to delete from a user.
     * @return - FullPetDTO object, containing all the information for the deleted Pet Entity.
     */
    public FullPetDTO deletePetFromUser(UUID petId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Pet pet = petRepository.findById(petId).orElseThrow(() -> {
            log.warn("Attempted to delete a Pet with id: {} for User with id: {}, which does not exist.", petId,user.getId());
            throw new PetNotFoundException(String.format("Pet with id: %s and owner: %s does not exist!", petId,user.getUsername()));
        });

        petRepository.deleteById(pet.getId());
        log.info("Pet with details : {}, was deleted!", pet);
        return modelMapper.map(pet, FullPetDTO.class);
    }
}