package preproject.stackoverflow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {
    @Getter
    public static class Post {
        @Positive
        private long memberId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }
    @Getter
    public static class Patch {
        @Setter
        private Long questionId;
        @Pattern(regexp = "\\S+")
        private String title;
        @Pattern(regexp = "\\S+")
        private String content;

    }


    @Getter
    public static class ResponseList {
        private List<SimpleResponse> data;
        private PageInfo pageInfo;

        public ResponseList(List<SimpleResponse> data, Page page) {
            this.data = data;
            this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(),
                    (int) page.getTotalElements(), page.getTotalPages());
        }

        @Getter
        @AllArgsConstructor
        public static class SimpleResponse {
            private long questionId;
            private String title;
            private String content;
            private LocalDateTime date;
            private long memberId;
            private String questioner;
            private long answers;

        }

        @Getter
        @AllArgsConstructor
        public static class PageInfo {
            private int page;
            private int size;
            private int totalElements;
            private int totalPages;
        }
    }
}
