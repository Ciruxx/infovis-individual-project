import React, {Component} from 'react'

import RectsChart from './charts/RectsChart'
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Box} from "@material-ui/core";
import Container from '@material-ui/core/Container';

class D3Example extends Component {
    render() {
        return (
            <div>
                <Container maxWidth="md">
                    <br/>
                    <br/>
                    <Typography variant="h2" color="textPrimary" align="center">
                        Dynamic <strong>rect</strong>
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" align="center">
                        Ciro Santillo - Progetto individuale
                    </Typography>
                    <br/>
                    <br/>
                    <Paper elevation={3}>
                        <Box display="flex" justifyContent="center">
                            <RectsChart/>
                        </Box>
                    </Paper>
                    <br/>
                    <br/>
                </Container>
            </div>
        )
    }
}

export default D3Example