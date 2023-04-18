package preproject.stackoverflow.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
