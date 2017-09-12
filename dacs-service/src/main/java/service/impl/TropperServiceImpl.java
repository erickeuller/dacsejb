package service.impl;

import domain.Trooper;
import service.TrooperService;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Collection;
import java.util.Collections;

/**
 * Created by erick on 11/09/17.
 */
@Stateless(name = TrooperService.SERVICE_NAME)
public class TropperServiceImpl implements TrooperService {

    @PersistenceContext(name = "dacsdb")
    private EntityManager em;

    public Trooper find(Long id) {
        return em.find(Trooper.class, id);
    }

    public Collection<Trooper> findAll() {
        String query = "SELECT t FROM Trooper t";
        Query q = em.createQuery(query);
        return q.getResultList();
    }

    public Trooper create(Trooper trooper) {
        em.persist(trooper);
        return trooper;
    }

    public Trooper update(Trooper trooper) {
        return em.merge(trooper);
    }

    public void delete(Trooper trooper) {
        trooper = find(trooper.getId());
        em.remove(trooper);
    }
}
