import React from 'react';
import { WingBlank, Carousel } from 'antd-mobile';


export class Guide extends React.Component {
    state = {
        images:[
            require("../../assets/images/slide1.png"),
            require("../../assets/images/slide2.png"),
            require("../../assets/images/slide3.png"),
            require("../../assets/images/slide4.png"),
        ],
        imgHeight: 176,
    }
    toApp(id){
        const{history}=this.props;
        if(id===this.state.images.length-1){
            history.push("/firstPage/home")
        }


    }
    componentDidMount() {
        if(localStorage.pCount){
            localStorage.pCount++;
            if(localStorage.pCount>3){
                const{history}=this.props;
                history.push('/firstPage/home');
            }

        }else{
            localStorage.pCount=1;
        }
     
    }
    render() {
        return (
            <div>
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                    >           
                        {this.state.images.map((val,index) => (
                           
                             <img  key={index}
                                src={val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onClick={()=>this.toApp(index)}
                                // onLoad={() => {
                                //     // fire window resize event to change height
                                //     window.dispatchEvent(new Event('resize'));
                                //     this.setState({ imgHeight: 'auto' });
                                //     { passive: false }
                                // }}
                            />
                            
                    
                           

                        ))}
                    </Carousel>
                </WingBlank>
            </div>
        )
    }
}