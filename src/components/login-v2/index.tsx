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
                      ASL Logistics was established in 2005,
                    </span>{' '}
                    specializing in providing
                  </p>

                  <p>
                    international freight forwarding services. Over 19 years of
                    development,
                  </p>

                  <p>
                    ASL Logistics has become one of the Top logistics company
                    providing
                  </p>

                  <p>
                    international multimodal transportation services, customs
                    broker,
                  </p>

                  <p>
                    domestic transportation and distribution service in Vietnam.
                  </p>
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
