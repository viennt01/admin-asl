import style from './login.module.scss';
import { Col, Row, Form } from 'antd';
import FormLogin from './components/form-login';

export default function LoginPageV2() {
  const [formLogin] = Form.useForm();

  return (
    <div className={`${style.body}`}>
      <div className={`${style.bodyContent}`}>
        <div className={`${style.bodyfiller}`}></div>

        <div className={`${style.bodyContainer}`}>
          <Row>
            <Col xs={0} sm={0} md={0} lg={14} xl={16} span={24}>
              <div className={style.introCover}>
                <div className={style.intro}>
                  <div className={style.intro}>
                    <div className={style.typingText}>
                      <span className={style.one}>welcome to </span>
                      <span className={style.two}>
                        A<span className={style.textBlue}>SL</span> Logistics
                      </span>
                    </div>
                  </div>
                </div>

                <div className={style.cssTyping}>
                  <p>
                    <span className={style.textBlue}>
                      Amerasian Shipping Logistics Corporation (ASL Logistics)
                    </span>{' '}
                    is an
                  </p>

                  <p>
                    International Sea-Air Freight Forwarding and Logistics
                    Company based in
                  </p>

                  <p>
                    Vietnam. We’re first established in 2005 with just a modest
                    staff of
                  </p>

                  <p>
                    10 employees. Nowadays, we have expanded to a moderate staff
                    of
                  </p>

                  <p>100 experienced employees working at our four offices</p>

                  <p>throughout Vietnam.</p>
                </div>
              </div>
            </Col>

            <Col xs={24} md={24} lg={10} xl={8} span={24}>
              <div className={`${style.rightCover}`}>
                <div className={`${style.right}`}>
                  <FormLogin formLogin={formLogin} />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={`${style.imgCoverPlane}`}>
          <img src="/images/login/AirPlane.png" alt="" />
        </div>
      </div>
    </div>
  );
}
