import { Breadcrumb, Col, Row, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";

const renderLabel = (label, disabled) => {
  if (disabled) return <Typography.Text disabled>{label}</Typography.Text>;

  return label;
};

const renderBreadcrumb = (breadcrumb) => {
  if (!breadcrumb.href)
    return renderLabel(breadcrumb.label, breadcrumb.disabled);

  return (
    <Link href={breadcrumb.href}>
      {renderLabel(breadcrumb.label, breadcrumb.disabled)}
    </Link>
  );
};

const renderBreadcrumbs = (breadcrumbs) => {
  if (!breadcrumbs?.length) return <></>;

  return (
    <Breadcrumb style={{ marginBottom: 10 }}>
      {breadcrumbs.map((breadcrumb) => (
        <Breadcrumb.Item>{renderBreadcrumb(breadcrumb)}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

const PageLayout = ({ title, breadcrumbs, center, right }) => (
  <>
    {title && (
      <Head>
        <title>{title}</title>
      </Head>
    )}
    <Row>
      <Col flex="auto" />
      <Col flex="1000px">
        {renderBreadcrumbs(breadcrumbs)}
        <Row gutter={[20, 20]}>
          <Col flex="660px">{center}</Col>
          <Col flex="360px">{right}</Col>
        </Row>
      </Col>
      <Col flex="auto" />
    </Row>
  </>
);

export default PageLayout;
