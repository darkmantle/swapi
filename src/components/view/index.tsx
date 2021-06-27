import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useAsync from "../../hooks/useAsync";
import Loader from "react-loader";
import './index.scss';
import { getPlanetById } from "../../swapi";

const View = () => {

    let { id } = useParams<any>();
    const [films, setFilms] = useState<string[]>();
    const [residents, setResidents] = useState<string[]>();
    const history = useHistory();

    // Fetch planet data asynchronously
    const { execute, status, value, error }: any = useAsync(() => getPlanetById(id), false);
    useEffect(() => execute(), []);

    // Get names of films and residents
    useEffect(() => {
        if (!value) return;

        Promise.all(value.films.map(url => fetch(url)
            .then(response => response.json())
            .then(responseBody => responseBody.title)))
            .then((titles: any) => setFilms(titles))
            .catch(err => {
                console.error('Failed to fetch one or more of these URLs:');
                console.log(value.films);
                console.error(err);
            });

        Promise.all(value.residents.map(url => fetch(url)
            .then(response => response.json())
            .then(responseBody => responseBody.name)))
            .then((names: any) => setResidents(names))
            .catch(err => {
                console.error('Failed to fetch one or more of these URLs:');
                console.log(value.films);
                console.error(err);
            });

    }, [value])

    return (
        <div className="container" id="viewpage">
            <div className="row">
                <div className="col d-flex align-items-center justify-content-center header">
                    <div className="back" onClick={() => history.goBack()}>Go Back</div>
                    <h2>Planet Information</h2>
                </div>
            </div>

            <Loader color="#fff" loaded={status === "success" || status === "error"}>
                {status === "error" ?
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            There was an error loading the data - please try again later
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col">
                            <div className="list-group">
                                <ul className="list-group">
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Name: </div>
                                        <div className="p-2">{value?.name}</div>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Population: </div>
                                        <div className="p-2">{value?.population}</div>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Climate: </div>
                                        <div className="p-2">{value?.climate}</div>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Gravity: </div>
                                        <div className="p-2">{value?.gravity}</div>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Terrain: </div>
                                        <div className="p-2">{value?.terrain}</div>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Surface Water: </div>
                                        <div className="p-2">{value?.surface_water}</div>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Residents: </div>
                                        <div className="p-2">{residents?.map(resident => (<>{resident}<br /></>))}</div>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <div className="p-2 title">Films: </div>
                                        <div className="p-2">{films?.map(film => (<>{film}<br /></>))}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </Loader>
        </div>
    )
}

export default View;