package com.example.demo.controller;

import com.example.demo.entity.CricketTeam;
import com.example.demo.service.CricketTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cricket-api")
@CrossOrigin(origins = "*")
public class CricketTeamController {

    @Autowired
    private CricketTeamService cricketTeamService;
    
    @GetMapping("/")
    public String home() 
    {
        return "Cricket-Home";
    }

    @PostMapping("/add")
    public ResponseEntity<CricketTeam> addTeam(@RequestBody CricketTeam team) {
        CricketTeam savedTeam = cricketTeamService.addTeam(team);
        return new ResponseEntity<>(savedTeam, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CricketTeam>> getAllTeams() {
        List<CricketTeam> teams = cricketTeamService.getAllTeams();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTeamById(@PathVariable int id) {
        CricketTeam team = cricketTeamService.getTeamById(id);
        if (team != null) {
            return new ResponseEntity<>(team, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Team not found with ID: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTeam(@RequestBody CricketTeam team) {
        CricketTeam existingTeam = cricketTeamService.getTeamById(team.getId());
        if (existingTeam != null) {
            CricketTeam updatedTeam = cricketTeamService.updateTeam(team);
            return new ResponseEntity<>(updatedTeam, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Team not found with ID: " + team.getId(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTeam(@PathVariable int id) {
        CricketTeam existingTeam = cricketTeamService.getTeamById(id);
        if (existingTeam != null) {
            cricketTeamService.deleteTeamById(id);
            return new ResponseEntity<>("Team with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Team not found with ID: " + id, HttpStatus.NOT_FOUND);
        }
    }
}