package preproject.stackoverflow.member.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;


import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByGithubId(Long githubId);

    Page<Member> findAllByMemberStatus(Pageable pageable, Member.MemberStatus memberStatus);

}
