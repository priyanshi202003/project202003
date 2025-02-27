import tensorflow as tf
from tensorflow import keras
import numpy as np

# Dummy Dataset
X_train = np.random.rand(100, 64, 64, 3)
y_train = np.random.randint(0, 3, 100)

# Create Model
model = keras.models.Sequential([
    keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(64, 64, 3)),
    keras.layers.MaxPooling2D(2,2),
    keras.layers.Flatten(),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(3, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=5)

# Save Model
model.save("model")
