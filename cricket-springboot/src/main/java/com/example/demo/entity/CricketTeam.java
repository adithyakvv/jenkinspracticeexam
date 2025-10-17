package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cricket_team")
public class CricketTeam {

    @Id
    @Column(name = "team_id")
    private int id;

    @Column(name = "team_name", nullable = false, length = 100)
    private String teamName;

    @Column(name = "team_captain", nullable = false, length = 50)
    private String captain;

    @Column(name = "team_country", nullable = false, length = 50)
    private String country;

    @Column(name = "num_players", nullable = false)
    private int numberOfPlayers;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getCaptain() {
        return captain;
    }

    public void setCaptain(String captain) {
        this.captain = captain;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public void setNumberOfPlayers(int numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
    }
}