package preproject.stackoverflow.auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.answer.entity.AnswerVote;
import preproject.stackoverflow.auth.dto.ProfileDTO;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.question.entity.QuestionVote;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    @Mapping(source = "OAuth2Status", target = "oAuth2Status")
    ProfileDTO MemberToProfileDTO(Member member);

    @Mapping(source = "question.questionId", target = "questionId")
    @Mapping(source = "questionVoteStatus", target = "voteStatus")
    ProfileDTO.QuestionVote questionVoteToProfileQuestionVote(QuestionVote questionVote);

    List<ProfileDTO.QuestionVote> questionVotesToProfileQuestionVotes(List<QuestionVote> questionVotes);

    @Mapping(source = "answer.answerId", target = "answerId")
    @Mapping(source = "answerVoteStatus", target = "voteStatus")
    ProfileDTO.AnswerVote answerVoteToProfileAnswerVote(AnswerVote answerVote);

    List<ProfileDTO.AnswerVote> answerVotesToProfileAnswerVotes(List<AnswerVote> answerVotes);
}
