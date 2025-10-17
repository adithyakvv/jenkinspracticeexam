package com.example.demo.repository;

import com.example.demo.entity.CricketTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CricketTeamRepository extends JpaRepository<CricketTeam, Integer> {
}