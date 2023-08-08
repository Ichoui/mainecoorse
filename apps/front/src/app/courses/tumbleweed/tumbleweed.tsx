import Tumble from './tumbleweed.png'
import './tumbleweed.scss'
export const Tumbleweed = () => {

  return (<div className='Tumbleweeds'>
    <img src={Tumble} className='tumbleweed' alt='Tumbleweed-1' />
    <img src={Tumble} className='tumbleweed' alt='Tumbleweed-2' />
    <img src={Tumble} className='tumbleweed' alt='Tumbleweed-3' />
  </div>)
}
