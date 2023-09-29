package com.uni.vetclinicapi.persistaence.repository;

import com.uni.vetclinicapi.persistaence.entity.Pet;
import com.uni.vetclinicapi.persistaence.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PetRepository extends JpaRepository<Pet, UUID> {

    /**
     * Provides collection of cars related to the specified user.
     *
     * @param user - the id of the specified user.
     * @return - collection of cars related to the user.
     */
    List<Pet> findAllByUser(User user);
}
