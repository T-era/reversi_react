import { Score } from '../../rev';

interface Props {
    score: Score;
}
export default function ScoreBoard(props :Props) {
    let { score } = props;
    return (
        <>
            <details className='score'>
                <summary>Score</summary>
                <table>
                <tbody>
                    <tr>
                        <th>Black: </th>
                        <td>{score.black}</td>
                    </tr>
                    <tr>
                        <th>White: </th>
                        <td>{score.white}</td>
                    </tr>
                </tbody>
                </table>
            </details>
        </>

    )
}