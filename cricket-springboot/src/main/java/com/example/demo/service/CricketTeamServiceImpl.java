package com.example.demo.service;

import com.example.demo.entity.CricketTeam;
import com.example.demo.repository.CricketTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CricketTeamServiceImpl implements CricketTeamService {

    @Autowired
    private CricketTeamRepository cricketTeamRepository;

    @Override
    public CricketTeam addTeam(CricketTeam team) {
        return cricketTeamRepository.save(team);
    }

    @Override
    public List<CricketTeam> getAllTeams() {
        return cricketTeamRepository.findAll();
    }

    @Override
    public CricketTeam getTeamById(int id) {
        Optional<CricketTeam> optional = cricketTeamRepository.findById(id);
        return optional.orElse(null);
    }

    @Override
    public CricketTeam updateTeam(CricketTeam team) {
        return cricketTeamRepository.save(team);
    }

    @Override
    public void deleteTeamById(int id) {
        cricketTeamRepository.deleteById(id);
    }
}