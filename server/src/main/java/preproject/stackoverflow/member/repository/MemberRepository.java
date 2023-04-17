package preproject.stackoverflow.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
