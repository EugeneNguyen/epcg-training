import {useQuery} from "../../../../../generator/_components";
import API from './api';
import AuthHelper from "../../../../auth/helper";
import {Area, AreaChart, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import classNames from "classnames";
import round from 'lodash/round';

export default function ScoreDistributionChart({examId}) {
  const {data, error, loading} = useQuery(API.GET_EXAM_BY_ID, {variables: {id: examId, token: AuthHelper.token()}});

  if (loading) return "Loading ...";
  if (error) return "Error ...";

  const chartData = getChartData(data);
  const myAttempts = data.me.examAttempts;

  return (
    <div>
      <ResponsiveContainer width="100%" aspect={2}>
        <AreaChart data={chartData} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="score" type="number" tickCount={11}/>
          <Area name="All Classes" type="monotone" dataKey="allCourseCount" unit="%" stroke="#82ca9d" fillOpacity={1}
                fill="url(#colorPv)"/>
          <Area name="My Class" type="monotone" dataKey="count" unit="%" stroke="#8884d8" fillOpacity={1}
                fill="url(#colorUv)"/>
          <Legend verticalAlign="top" height={36}/>
          <Tooltip/>
          {myAttempts.map(attempt => (
            <ReferenceLine x={attempt.score} stroke="green" label="You're here"/>
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <div className={classNames('text-center')}>
        Score Distribution
      </div>
    </div>
  );
}

function getChartData(data) {
  const result = [];
  for (let i = 0; i <= 100; i = i + 10) {
    const courseAttempts = data.data.attempts;
    const allCourseAttempts = data.allAttempts.courseTemplateExam.attempts;
    const percentage = (attempts) => {
      return round(attempts.filter(a => a.score >= i && a.score < i + 10).length * 100 / attempts.length);
    }
    result.push({
      score: i,
      count: percentage(courseAttempts),
      allCourseCount: percentage(allCourseAttempts),
    })
  }

  return result;
}