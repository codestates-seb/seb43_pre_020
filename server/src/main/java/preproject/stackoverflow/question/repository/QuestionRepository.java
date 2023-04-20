package preproject.stackoverflow.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAlllByMember_MemberStatus(Pageable pageable, Member.MemberStatus memberStatus);
    Question findByMember_MemberStatus(Member.MemberStatus memberStatus);
}
