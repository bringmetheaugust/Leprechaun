import TransModel from "@shared/models/Trans";

interface Props {
    data: TransModel
}

const TransList = ({ data }: Props) => (
    <ul>
        {Object.entries(data).map<JSX.Element>(([k, v]) => (
            <li key={k}>{k}: {v}</li>
        ))}
    </ul>
);

export default TransList;
