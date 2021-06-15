const React = require('react');

class barViz extends React.Component {
  render() {
    const { hasError, idyll, updateProps, ...props } = this.props;
    const h = 25
    const mul = 65
    const space = 45
    const small_space = 17.5
    return (
      <div>
        <svg
          width={800}
          height={450}
          style={{ width: '100%', height: 'auto', margin:'auto', display: 'block', background: 'white' }}
        >
          
           <rect width={props.data} height={h} y={0} x={0} stroke={"black"} strokeOpacity={1} strokeWidth={2} fill={'aliceblue'} />
           <text x={3} y={space} fill={'black'} fontWeight={'bold'}>Time you spent working on Capstone</text>
           <text x={props.data+small_space} y={small_space} fill={'black'}>{Math.round(props.data)} Hours</text>

           <rect y={mul} width={600} height={h}  x={0} stroke={"black"} strokeOpacity={0.1} strokeWidth={2} fill={'aliceblue'} />
           <text y={mul+space} x={3}  fill={'black'}>Achieving fluency in Spanish </text>
           <text y={mul+small_space} x={600+10}  fill={'black'}>600 Hours</text>

           <rect y={mul*2} width={480} height={h}  x={0} stroke={"black"} strokeOpacity={0.1} strokeWidth={2} fill={'aliceblue'} />
           <text y={mul*2+space} x={3}  fill={'black'}>3 months working a full time job</text>
           <text y={mul*2+small_space} x={480+10}  fill={'black'}>480 Hours</text>

           <rect y={mul*3} width={242} height={h}  x={0} stroke={"black"} strokeOpacity={0.1} strokeWidth={2} fill={'aliceblue'} />
           <text y={mul*3+space} x={3}  fill={'black'}>Internship/practicum (4 credits) </text>
           <text y={mul*3+small_space} x={242+10}  fill={'black'}>242 Hours</text>


           <rect y={mul*4} width={200} height={h}  x={0} stroke={"black"} strokeOpacity={0.1} strokeWidth={2} fill={'aliceblue'} />
           <text y={mul*4+space} x={3}  fill={'black'}>Making a good or best friend</text>
           <text y={mul*4+small_space} x={200+10}  fill={'black'}>200 Hours</text>

           <rect y={mul*5} width={171} height={h}  x={0} stroke={"black"} strokeOpacity={0.1} strokeWidth={2} fill={'aliceblue'} />
           <text y={mul*5+space} x={3}  fill={'black'}>Senior tutorial</text>
           <text y={mul*5+small_space} x={171+10}  fill={'black'}>171 Hours</text>

           <rect y={mul*6} width={737 - props.data} height={h}  x={0} stroke={"black"} strokeOpacity={1} strokeWidth={2} fill={'aliceblue'} />
           <text y={mul*6+space} x={3}  fill={'black'} fontWeight={'bold'}>Time you didn't spend working on Capstone</text>
           <text y={mul*6+small_space} x={737 - props.data+10}  fill={'black'}>{737 - Math.round(props.data)} Hours</text>



        </svg>
      </div>
    );
  }
}

module.exports = barViz;
