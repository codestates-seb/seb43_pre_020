package preproject.stackoverflow.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.auth.dto.LoginDTO;
import preproject.stackoverflow.auth.jwt.JwtTokenizer;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final AuthenticationSuccessHandlerUtils authenticationSuccessHandlerUtils;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Member member = (Member) authentication.getPrincipal();
        authenticationSuccessHandlerUtils.setLoginTime(member);

        String accessToken = authenticationSuccessHandlerUtils.delegateAccessToken(member);
        response.setHeader("Authorization", "Bearer " + accessToken);

        if((Boolean) request.getAttribute("autoLogin")){
            String refreshToken = authenticationSuccessHandlerUtils.delegateRefreshToken(member);
            response.setHeader("Refresh", refreshToken);
        }

        setMemberIdToBody(response, member);
    }

    private void setMemberIdToBody(HttpServletResponse response, Member member) throws IOException {
        Map<String, Long> loginResponse = new HashMap<>();
        loginResponse.put("memberId", member.getMemberId());
        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(loginResponse));
    }

}
