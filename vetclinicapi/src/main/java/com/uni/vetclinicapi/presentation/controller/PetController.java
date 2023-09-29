package com.uni.vetclinicapi.presentation.controller;

import com.uni.vetclinicapi.service.PetService;
import com.uni.vetclinicapi.service.dto.ApiErrorResponseDTO;
import com.uni.vetclinicapi.service.dto.FullPetDTO;
import com.uni.vetclinicapi.service.dto.PetDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Processes requests regarding "/pet" endpoint coming to the api, and returns responses based on them.
 */
@RequiredArgsConstructor
@RequestMapping("/api/v1/pet")
@RestController
@Tag(name = "pets", description = "The Pet API.")
public class PetController {

    private final PetService petService;

    /**
     * Creates a pet.
     *
     * @param petDTO - data that the created Pet must include.
     * @return - response with status code CREATED if the car was created successfully or CONFLICT if the car with this registration number already exists.
     */
    @Operation(summary = "Create new Pet.", description = "Creates new Pet and persists to database.", tags = {"pets"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Pet created.", content = @Content(schema = @Schema(implementation = FullPetDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input.", content = @Content(schema = @Schema(implementation = ApiErrorResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = @Content(schema = @Schema(implementation = ApiErrorResponseDTO.class))),
            @ApiResponse(responseCode = "409", description = "Pet already exists.", content = @Content(schema = @Schema(implementation = ApiErrorResponseDTO.class)))
    })
    @PostMapping
    public ResponseEntity<FullPetDTO> createCar(
            @Parameter(
                    description = "Pet to create. Cannot be null or empty.",
                    required = true, schema = @Schema(implementation = PetDTO.class))
            @Valid @RequestBody PetDTO petDTO) {
        return new ResponseEntity<>(petService.create(petDTO), HttpStatus.CREATED);
    }

    //TODO
    // MOVE IT TO USER CONTROLLER
    
    @Operation(summary = "Find all Pets.", description = "Delivers Pets from database.", tags = {"pets"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Delivers part of the Pets from database.", content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = @Content(schema = @Schema(implementation = ApiErrorResponseDTO.class))),
    })
    @GetMapping("/all")
    public ResponseEntity<List<FullPetDTO>> getAllPetsForUser() {
        return new ResponseEntity<>(petService.findAllPetsForUser(), HttpStatus.OK);
    }
}
