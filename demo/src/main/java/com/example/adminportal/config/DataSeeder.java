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
                        new Member("Peter", "Murphy", "p@bauhaus.com", UUID.randomUUID(),1001),
                        new Member("Bill", "Leeb", "keys@fla.com", UUID.randomUUID(),1102),
                        new Member("Siouxsie", "Sue", "siouxsie@banshees.com", UUID.randomUUID(),1103),
                        new Member("Wren", "Scheit", "wren@outland.com", UUID.randomUUID(),1104),
                        new Member("Andrew", "Eldritch", "sister@thesistersofmercy.com", UUID.randomUUID(),1105),
                        new Member("Robert", "Smith", "disintegration@thecure.com", UUID.randomUUID(),1106),
                        new Member("Nivek", "Ogre", "ogre@skinnypuppy.com", UUID.randomUUID(),1107),
                        new Member("Douglas", "McCarthy", "control@nitzer-ebb.com", UUID.randomUUID(),1108),
                        new Member("Ronny", "Moorings", "medusa@clanofxymox.com", UUID.randomUUID(),1109),
                        new Member("Sascha", "Konietzko", "ultraheavybeat@kmfdm.com", UUID.randomUUID(),1110),
                        new Member("Dave", "Gahan", "violator@depechemode.com", UUID.randomUUID(), 1111)
                ));
            }
        };
    }
}
