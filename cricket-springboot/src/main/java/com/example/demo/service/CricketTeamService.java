package com.example.demo.service;

import com.example.demo.entity.CricketTeam;
import java.util.List;

public interface CricketTeamService {
    CricketTeam addTeam(CricketTeam team);
    List<CricketTeam> getAllTeams();
    CricketTeam getTeamById(int id);
    CricketTeam updateTeam(CricketTeam team);
    void deleteTeamById(int id);
}