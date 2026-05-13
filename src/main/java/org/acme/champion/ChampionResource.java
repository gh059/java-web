package org.acme.champion;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
@Path("/champions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChampionResource {
// 전체 목록 조회
@GET
public List<Champion> list() {
return Champion.listAll();
}
// 새 챔피언 추가
@POST
@Transactional
public void add(Champion champion) {
champion.persist();
}
}