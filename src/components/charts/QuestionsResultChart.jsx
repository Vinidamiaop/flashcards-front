import {Cell, Pie, PieChart} from "recharts";

export default function QuestionsResultChart({score}) {
    const RADIAN = Math.PI / 180;
    const data = [
        { name: 'A', value: 50, color: '#c74e4e' },
        { name: 'B', value: 30, color: '#e0dd6e' },
        { name: 'C', value: 20, color: '#57c766' },
    ];

    const cx = 75;
    const cy = 50;
    const iR = 26;
    const oR = 35;
    const value = score;

    const needle = (value, data, cx, cy, iR, oR, color) => {
        let total = 0;
        data.forEach((v) => {
            total += v.value;
        });
        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
            <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
        ];
    };

    return (
        <>
            <PieChart width={150} height={70}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                >
                    {data.map((entry, index) => {
                        return <Cell key={index} fill={entry.color} className="pointer-events-none" />
                    })}
                </Pie>
                { needle(score, data, cx, cy, iR, oR, '#dcd02e') }
            </PieChart>
        </>
    )
}
