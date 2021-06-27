import React, { useEffect, useState } from "react";
import useAsync from "../../hooks/useAsync";
import { sumBy } from "lodash";
import { useHistory } from "react-router-dom";
import Loader from "react-loader";
import './index.scss';
import { getAllPlanets } from "../../swapi";

const Home = () => {

    const [totalPopulation, setTotalPopulation] = useState<number>(0);
    const history = useHistory();

    const { execute, status, value, error }: any = useAsync(getAllPlanets, false);
    useEffect(() => execute(), []);


    // Calculate the total population of the galaxy and population percentage
    useEffect(() => {
        if (value) setTotalPopulation(sumBy(value, (v) => parseInt(v.population) || 0))
    }, [value]);

    const getPercent = (population) => {
        const tempPop = parseInt(population) || 0;
        return ((tempPop / totalPopulation) * 100).toFixed(2);
    }

    const openLink = (url) => {
        const id = url.replace("https://swapi.dev/api/planets/", "").replace("/", "");
        history.push(`/view/${id}`);
    }

    return (
        <div className="container" id="homepage">
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <h2>Planet Registry</h2>
                </div>
            </div>

            <Loader loaded={status === "success" || status === "error"} color="#fff">
                {status === "error" ?
                    <div className="row">
                        <div className="col d-flex justify-content-center">
                            There was an error loading the data - please try again later
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Population</th>
                                        <th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {status === "success" && value?.map(planet => (
                                        <tr key={planet.name}>
                                            <td onClick={() => openLink(planet.url)}>{planet.name}</td>
                                            <td>{parseInt(planet.population) || 0}</td>
                                            <td>{getPercent(planet.population)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </Loader>
        </div>
    )
}

export default Home;