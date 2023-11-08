package com.uni.vetclinicapi.persistance.repository;

import com.uni.vetclinicapi.persistance.entity.Pet;
import com.uni.vetclinicapi.persistance.entity.User;
import com.uni.vetclinicapi.persistance.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VisitRepository extends JpaRepository<Visit, UUID> {

    Optional<Visit> findByDateAndTime(Date date, Time time);

    List<Visit> findAllByUser(User user);

}
