import "../styles/Grid.css"

function GridSquare() {
    return <div className="Grid-square"></div>;
}

export default function Grid({scaleString="20"}) {
    let gridScale = parseInt(scaleString);

    return <div className="Grid">
        {[...Array(gridScale)].map(() => (
            <div>
                {[...Array(gridScale)].map(() => (
                    <GridSquare/>
                ))}
            </div>
        ))}
    </div>
}