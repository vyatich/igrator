package com.name.brief.service;

import com.name.brief.model.GameSession;
import com.name.brief.model.Player;
import com.name.brief.repository.PlayerRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@WebMvcTest(PlayerService.class)
public class PlayerServiceImplTest {
    @Autowired
    private PlayerService playerService;

    @MockBean
    private PlayerRepository repository;
    @MockBean
    private GameSessionService gameSessionService;

    @Test
    public void addResponses_addsNewDecisionObjectAndPersistsItToDb() {
        GameSession session = mock(GameSession.class);
        when(session.getCurrentRoundIndex()).thenReturn(0);
        when(session.getId()).thenReturn(0L);
        when(gameSessionService.getSession(any())).thenReturn(session);
        Player player = new Player();
        player.setUsername("user");
        player.setGameSession(session);

        playerService.addResponses(player, "A1", 0);

        assertThat(player.getDecisions(), hasSize(1));
        verify(repository, times(1)).save(player);
    }
}