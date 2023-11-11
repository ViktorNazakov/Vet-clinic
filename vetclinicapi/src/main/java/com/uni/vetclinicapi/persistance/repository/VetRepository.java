package com.uni.vetclinicapi.persistance.repository;

import com.uni.vetclinicapi.persistance.entity.Vet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/**
 * Provides basic CRUD operations and other needed query methods, regarding the Vet entities.
 */
@Repository
public interface VetRepository extends JpaRepository<Vet, UUID> {
}
