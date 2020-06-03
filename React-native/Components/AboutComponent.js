import React from "react";
import { ScrollView, Text } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

function AboutUs(props) {
  return (
    <ScrollView>
      <Card title="Our History">
        <Text style={{ textAlign: "center" }}>
          Started in 2010, Ristorante con Fusion quickly established itself as a
          culinary icon par excellence in Hong Kong. With its unique brand of
          world fusion cuisine that can be found nowhere else, it enjoys
          patronage from the A-list clientele in Hong Kong. Featuring four of
          the best three-star Michelin chefs in the world, you never know what
          will arrive on your plate the next time you visit us.{"\n\n"}
          The restaurant traces its humble beginnings to The Frying Pan, a
          successful chain started by our CEO, Mr. Peter Pan, that featured for
          the first time the world's best cuisines in a pan.
        </Text>
      </Card>
      <Card title="Corporate Leadership">
        {props.leaders.leaders.map((leader) => (
          <ListItem
            key={leader.id}
            title={leader.name}
            subtitle={leader.description}
            leftAvatar={{ source: { uri: baseUrl + leader.image } }}
          />
        ))}
      </Card>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

export default connect(mapStateToProps)(AboutUs);
