package com.uni.vetclinicapi.presentation.controller;

import com.uni.vetclinicapi.service.UserService;
import com.uni.vetclinicapi.service.dto.ApiErrorResponseDTO;
import com.uni.vetclinicapi.service.dto.FullPetDTO;
import com.uni.vetclinicapi.service.dto.RegisterRequestDTO;
import com.uni.vetclinicapi.service.dto.UserInfoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
@RestController
@Tag(name = "admin", description = "The Admin API.")
public class AdminController {

    private final UserService userService;


    /**
     * Retrieves all users from database
     *
     * @return - response entity containing a list with all users with status code OK.
     */
    @Operation(summary = "Register account.", description = "Allows the user to register an account.", tags = {"admin"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully signed up an account.", content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = @Content(schema = @Schema(implementation = ApiErrorResponseDTO.class))),
    })
    @GetMapping("/users")
    public ResponseEntity<List<UserInfoDTO>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }


    /**
     * Deletes a user.
     *
     * @param userId - id for user to delete.
     * @return - response with status code OK if the user was deleted successfully or CONFLICT if the user with this id does not exist.
     */
    @Operation(summary = "Deletes a User.", description = "Deletes Pet from database.", tags = {"admin"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Deletes Pet from database.", content = @Content(schema = @Schema(implementation = UserInfoDTO.class))),
            @ApiResponse(responseCode = "404", description = "User does not exist in the database", content = @Content(schema = @Schema(implementation = ApiErrorResponseDTO.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized.", content = @Content(schema = @Schema(implementation = ApiErrorResponseDTO.class))),
    })
    @DeleteMapping("/users")
    public ResponseEntity<UserInfoDTO> deleteUser(
            @Parameter(description = "User id.")
            @RequestParam("userId") @NotNull UUID userId) {
        return new ResponseEntity<>(userService.deleteUser(userId), HttpStatus.OK);
    }



}

