package service;

import domain.Trooper;

import javax.ejb.Local;
import java.util.Collection;

/**
 * Created by erick on 10/09/17.
 */
@Local
public interface TrooperService {

    static final String SERVICE_NAME = "TrooperService";

    Trooper find(Long id);

    Collection<Trooper> findAll();

    Trooper create(Trooper trooper);

    Trooper update(Trooper trooper);

    void delete(Trooper trooper);
}
