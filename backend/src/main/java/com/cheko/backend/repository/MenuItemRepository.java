package com.cheko.backend.repository;

import com.cheko.backend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {

    @Query("""
        SELECT m FROM MenuItem m
        WHERE (:category IS NULL OR m.category = :category)
          AND (:search IS NULL
               OR LOWER(m.name) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%'))
               OR LOWER(m.description) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%')))
        ORDER BY m.id
        """)
    List<MenuItem> findByFilters(@Param("search") String search, @Param("category") String category);
}