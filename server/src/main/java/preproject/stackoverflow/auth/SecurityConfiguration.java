package preproject.stackoverflow.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import preproject.stackoverflow.auth.filter.JwtAuthenticationFilter;
import preproject.stackoverflow.auth.filter.JwtVerificationFilter;
import preproject.stackoverflow.auth.handler.*;
import preproject.stackoverflow.auth.jwt.JwtTokenizer;
import preproject.stackoverflow.auth.utils.CustomAuthorityUtils;
import preproject.stackoverflow.member.repository.MemberRepository;

import java.util.List;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;
    private final AuthenticationSuccessHandlerUtils authenticationSuccessHandlerUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberRepository memberRepository, AuthenticationSuccessHandlerUtils authenticationSuccessHandlerUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberRepository = memberRepository;
        this.authenticationSuccessHandlerUtils = authenticationSuccessHandlerUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin().and()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryHandler())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer()).and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/auth/refresh").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/profile").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/members").permitAll()
                        .antMatchers(HttpMethod.GET, "/members/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/questions").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                        .antMatchers("/questions/**").hasRole("USER")
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 ->
                        oauth2.successHandler(new OAuth2AuthenticationSuccessHandler(authorityUtils, memberRepository, authenticationSuccessHandlerUtils)));

        return http.build();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager);
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(authenticationSuccessHandlerUtils));
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, memberRepository);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PATCH", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }

}
