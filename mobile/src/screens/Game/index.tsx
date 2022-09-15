import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { GameParams } from "../../@types/navigation";
import React, { useEffect, useState } from "react";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const [duos, setDous] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();



  function handleGoBack() {
    navigation.goBack();
  }
  useEffect(() => {
    fetch(`http://e7f1-201-69-9-124.ngrok.io/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => setDous(data));
  });
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo
            </Text>
          }
        />
      </SafeAreaView>
    </Background>
  );
}