import MatchesOriginal from '../MatchesOriginal/MatchesOriginal.jsx';
import _ from 'lodash';
// import MatchesLeftCollapsed from './MatchesLeftCollapsed.jsx'
// import MatchesAsDecimal from './MatchesAsDecimal.jsx'
import MatchesAsBinary from '../MatchesAsBinary/MatchesAsBinary.jsx'

export default class MatchVisualizerFactory {
    matchVizOptions = [
        {
            id: "original",
            display: "Matches Original",
            displaySmall: "Classic",
            visualizer: MatchesOriginal
        },
        // {
        //     id: "left",
        //     display: "Matches Left-Collapsed",
        //     displaySmall: "Matches-Left",
        //     visualizer: null
        //     // visualizer: MatchesLeftCollapsed
        // },
        // {
        //     id: "decimal",
        //     display: "Decimal Numbers",
        //     displaySmall: "Decimal",
        //     visualizer: null
        //     // visualizer: MatchesAsDecimal
        // },
        {
            id: "binary",
            display: "Binary Numbers",
            displaySmall: "Binary",
            // visualizer: null
            visualizer: MatchesAsBinary
        },
    ];

    allVizualizerOptions() {
        return this.matchVizOptions;
    }
    
    initialVisualizer() {
        return this.matchVizOptions[0].visualizer;
    }

    getVisualizer(modeId) {
        const expectedVisualizer = this.matchVizOptions.find((viz)=> {
            return viz.id === modeId;
        });
        if (_.isUndefined(expectedVisualizer)) {
            return null;
        } else { 
            return expectedVisualizer.visualizer;
        }
    }
};