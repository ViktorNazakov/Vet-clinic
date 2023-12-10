package com.uni.vetclinicapi.config;

import com.uni.vetclinicapi.persistance.entity.Medication;
import com.uni.vetclinicapi.persistance.entity.Role;
import com.uni.vetclinicapi.persistance.entity.User;
import com.uni.vetclinicapi.persistance.repository.MedicationRepository;
import com.uni.vetclinicapi.persistance.repository.RoleRepository;
import com.uni.vetclinicapi.persistance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class OnStartUp {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    private final MedicationRepository medicationRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void InitializeTestUnits() {
        Optional<Role> role = roleRepository.findByAuthority(Role.RoleType.ADMIN);
        User admin = new User(
                "Admin",
                passwordEncoder.encode("Password"),
                "email1@gmail.com",
                "Viktor",
                "Dimitrov",
                "0000000000",
                null,
                Set.of(role.get()));

        role = roleRepository.findByAuthority(Role.RoleType.VET);
        User vet = new User(
                "Vet",
                passwordEncoder.encode("Password"),
                "email2@gmail.com",
                "Martin",
                "Petrov",
                "0000000001",
                "Surgeon",
                Set.of(role.get()));

        role = roleRepository.findByAuthority(Role.RoleType.CUSTOMER);
        User customer = new User(
                "Customer",
                passwordEncoder.encode("Password"),
                "email3@gmail.com",
                "Ivan",
                "Ivanov",
                "0000000002",
                null,
                Set.of(role.get()));

        userRepository.saveAll(List.of(admin,customer,vet));

        Medication medication = new Medication(
                "Asd",
                "asd",
                23,
                "asd"
        );
        medicationRepository.save(medication);
        log.info("Test Entities initialized");
    }
}
