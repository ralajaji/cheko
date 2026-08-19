package com.cheko.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "menu")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    private Integer id;

    @Column(nullable = false)
    private String name;

    private String description;

    private Double price;

    private String image;

    private Integer calorie;

    @Column(nullable = false)
    private String category;

    private Double lat;

    private Double lng;
}