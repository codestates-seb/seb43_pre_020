package preproject.stackoverflow.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Getter
public class MultiResponseDTO<T> {
    private List<T> data;
    private PageInfo pageInfo;

    public MultiResponseDTO(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), (int) page.getTotalElements(), page.getTotalPages());
    }



}
