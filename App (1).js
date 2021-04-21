import React, { useEffect, useState } from 'react';
import { Image, Pressable, StatusBar, Text, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

const Gap = ({ height }) => (
    <View style={{ height }} />
)

const App = () => {
    const [url, setUrl] = useState("");
    const [file, setFile] = useState(null);
    const [type, setType] = useState("");

    const preAction = () => {
        setUrl("");
        setType("");
        setFile(null)
    }

    const onCamera = () => {
        preAction();
        launchCamera({
            mediaType: 'photo',
        }, (response) => {
            if (!response.errorMessage && !response.didCancel) {
                setUrl(response.uri)
                setType("camera");
            }
        })
    }

    const onGallery = () => {
        preAction();
        launchImageLibrary({
            mediaType: 'photo'
        }, (response) => {
            if (!response.errorMessage && !response.didCancel) {
                setUrl(response.uri);
                setType("gallery");
            }
        })
    }

    const onDocumentPicker = async () => {
        try {
            preAction();
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            setType("document");
            setFile({
                uri: res.uri,
                type: res.type,
                name: res.name,
                size: res.size
            })

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    return (
        <View style={{ flex: 1, paddingTop: 50, backgroundColor: 'white' }} accessibilityLabel="app-root">
            <StatusBar barStyle="dark-content" />
            <View style={{ alignItems: 'center' }}>
                <Pressable onPress={() => onCamera()} accessibilityLabel="btnCamera">
                    <Text>Image from Camera</Text>
                </Pressable>

                <Gap height={10} />

                <Pressable onPress={() => onGallery()} accessibilityLabel="btnGallery">
                    <Text>Image from Gallery</Text>
                </Pressable>

                <Gap height={10} />

                <Pressable onPress={() => onDocumentPicker()} accessibilityLabel="btnDocument">
                    <Text>File from Document Picker</Text>
                </Pressable>

                <Gap height={10} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text accessibilityLabel="btntype">{type}</Text>
                {
                    url ? (
                        <Image
                            accessibilityLabel="imageview"
                            accessible={true}
                            source={{ uri: url }}
                            style={{ width: '100%', flex: 1 }}
                        />
                    ) : null
                }

                {
                    file ? (
                        <View style={{ width: 250 }} accessibilityLabel="fileView" accessible={true}>
                            <Text>{JSON.stringify(file)}</Text>
                        </View>
                    ) : null
                }
            </View>
        </View>
    )
}

export default App;