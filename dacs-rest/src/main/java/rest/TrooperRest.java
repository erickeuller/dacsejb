package rest;

import domain.Trooper;
import org.apache.http.HttpStatus;
import service.TrooperService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;

/**
 * Created by erick on 11/09/17.
 */
@Path("/trooper")
public class TrooperRest {

    @EJB
    private TrooperService service;

    @GET
    @Path("/")
    @Produces(value = MediaType.APPLICATION_JSON)
    public Response getAll() {
        Collection<Trooper> troopers = service.findAll();
        return Response.ok().entity(troopers).build();
    }

    @GET
    @Path("/{id}")
    @Produces(value = MediaType.APPLICATION_JSON)
    public Response get(@PathParam("id") Long id) {
        Trooper trooper = service.find(id);
        Response response;
        if (trooper != null) {
            response = Response.ok().entity(trooper).build();
        }
        else {
            response = Response.status(HttpStatus.SC_NOT_FOUND).build();
        }

        return response;
    }

    @POST
    @Path("/")
    @Produces(value = MediaType.APPLICATION_JSON)
    @Consumes(value = MediaType.APPLICATION_JSON)
    public Response create(Trooper trooper) {
        trooper = service.create(trooper);
        return Response.status(HttpStatus.SC_CREATED).entity(trooper).build();
    }

    @PUT
    @Path("/")
    @Produces(value = MediaType.APPLICATION_JSON)
    @Consumes(value = MediaType.APPLICATION_JSON)
    public Response update(Trooper trooper) {
        trooper = service.update(trooper);
        return Response.ok().entity(trooper).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        Response response;
        Trooper trooper = service.find(id);
        if (trooper == null) {
            response = Response.status(HttpStatus.SC_NOT_FOUND).build();
        }
        else {
            service.delete(trooper);
            response = Response.ok().build();
        }
        return response;
    }
}
