import React, {Component} from 'react';
import { solver } from './solver'
import Configuration from './Configuration/Configuration'
import './App.css'
import './assets/style.css'
import CraftingTable from './assets/crafttable.png';

class App extends Component {
    state = {
        content: '',
        solutions: []
    }

    handleRead = (e) => {
        this.setState({content: e.target.result}, () => {
            let solutions = solver(this.state.content)
            this.setState({solutions})
        });
        
    }

    handleFileChange = (e) => {
            const file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = this.handleRead;
            reader.readAsText(file);
    }


    render() {

        return(
            <div className="home">
                <input className="inputfile" type="file" name="file" id="file" accept=".in" onChange={this.handleFileChange}/>
                <label htmlFor="file">Choose a file</label>
                <div>
                    {
                        this.state.solutions.solution && this.state.solutions.solution.length > 0 ?

                        <div>
                            {
                                this.state.solutions.solution.map((sol, index) => {
                                   return (
                                    <fieldset className="current-solution" key={index}>
                                        <legend>Configuration #{index+1}</legend>
                                        <Configuration solutionSet={sol} />
                                    </fieldset>
                                   )
                                })
                            }
                        </div>

                        :

                        <div className="empty-board">
                            <div className="filler">
                                <img src={CraftingTable} alt="crafting table"/>
                                <p>Upload a configuration.</p>
                                <span className="app-title">FINDING CHANCY</span>
                                <p className="names">Quinn Baticos | Mark Jay Nicolas | Kyle Reblora</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default App;