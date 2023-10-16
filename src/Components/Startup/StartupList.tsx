import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Fragment, ReactElement, useState, useEffect } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import Pagination from '@mui/material/Pagination';
import { Startup } from "../../Types/Startup";

export default function StartupList(): ReactElement {

    const [startups, setStartups] = useState<Startup[]>([]);
    const [page, setPage] = useState<number>(1);
    const pageCount = 20;
    const [currPageStartups, setCurrPageStartups] = useState<Startup[]> ([]);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setCurrPageStartups(() => {
            return startups.slice((value * pageCount) - pageCount, (value * pageCount))
        });
    };
        
       
     
    useEffect(() => {

        (async () => {

            try {
                const startupsData = await StartupHttpService.getStartups();
                setStartups(startupsData);
                setCurrPageStartups(startupsData.slice(0, 20));
            }
            catch (error) {
                alert("Startups not found.")
            };
        })();

    }, []);

    return <Fragment>
        <Pagination count={10} page={page} onChange={handleChange} />
        <div id="startup-list">
            {currPageStartups.map(startup => (

                <Card key={startup.id} sx={{ maxWidth: 'xl', marginBottom: 2 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h6">
                                {startup.name}
                        </Typography>

                        <Typography fontSize="3" component="div" color="text.secondary">
                            Founded: {startup.dateFounded.getFullYear()} | 
                                {startup.employees} Employees |
                                {startup.totalFunding} $ |
                                {startup.currentInvestmentStage}
                        </Typography>

                        <Typography variant="body1">
                              {startup.shortDescription}
                        </Typography>
                   
                    </CardContent>
                </CardActionArea>
                </Card>
                
            ))}
        
        </div>
    </Fragment>
}
