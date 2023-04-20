package preproject.stackoverflow.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {
    public static URI createUri(String uri, long id) {
        return UriComponentsBuilder.newInstance()
                .path(uri + "/" + id)
                .build()
                .toUri();
    }
}
