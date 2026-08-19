package com.example.adminportal.config;

import com.example.adminportal.entity.Member;
import com.example.adminportal.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;
import java.util.UUID;

@Configuration
@Profile("dev")
public class DataSeeder {

    @Bean
    CommandLineRunner seedMembers(MemberRepository memberRepository) {
        return args -> {

            if (memberRepository.count() == 0) {
                memberRepository.saveAll(List.of(
                        new Member("Peter", "Murphy", "p@bauhaus.com"),
                        new Member("Bill", "Leeb", "keys@fla.com"),
                        new Member("Siouxsie", "Sue", "siouxsie@banshees.com"),
                        new Member("Wren", "Scheit", "wren@outland.com"),
                        new Member("Andrew", "Eldritch", "sister@thesistersofmercy.com"),
                        new Member("Robert", "Smith", "disintegration@thecure.com"),
                        new Member("Nivek", "Ogre", "ogre@skinnypuppy.com"),
                        new Member("Douglas", "McCarthy", "control@nitzer-ebb.com"),
                        new Member("Ronny", "Moorings", "medusa@clanofxymox.com"),
                        new Member("Sascha", "Konietzko", "ultraheavybeat@kmfdm.com"),
                        new Member("Dave", "Gahan", "violator@depechemode.com")
                ));
            }
        };
    }
}
