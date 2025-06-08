# ML/AI Engine Deep Dive: Your Project Name

## Overview of the AI/ML Pipeline

This document details the machine learning models, data preprocessing, training procedures, and deployment strategies used in [Your Project Name].

---

### Model Architecture

[Your Project Name] utilizes two primary ONNX models for its core functionality:

1.  **`topic_model.onnx` (Topic Classifier):**
    * **Purpose:** Identifies the primary topic of a given text (e.g., "business", "politics", "gaming").
    * **Architecture:** Briefly describe the model's architecture (e.g., "A BERT-based classifier fine-tuned on X dataset," "A simple feed-forward neural network with X layers and Y activation functions").
    * **Inputs:** `int32` tensor, representing tokenized text input (shape: `[1, sequence_length]`).
    * **Outputs:** `float32` tensor, representing probabilities for each of the 6 predefined topics (shape: `[1, 6]`).
    * **Original Framework:** (e.g., PyTorch, TensorFlow, Keras)
    * **ONNX Export Details:** (e.g., `opset_version=15`)

2.  **`bias_model.onnx` (Bias Detector):**
    * **Purpose:** Assesses the potential bias of a given text, categorizing it into predefined bias levels (e.g., "neutral", "slightly biased", "highly biased").
    * **Architecture:** (e.g., "A lightweight Transformer model," "A custom CNN architecture.")
    * **Inputs:** `int32` tensor, representing tokenized text input (shape: `[1, sequence_length]`).
    * **Outputs:** `float32` tensor, representing probabilities for each of the 3 bias categories (shape: `[1, 3]`).
    * **Original Framework:** (e.g., PyTorch, TensorFlow, Keras)
    * **ONNX Export Details:** (e.g., `opset_version=15`)

---

### Data & Preprocessing

* **Data Sources:** Describe the datasets used for training and evaluation (e.g., "Custom scraped news articles," "Publicly available sentiment datasets").
* **Preprocessing Steps:**
    * **Text Cleaning:** (e.g., "Lowercasing, punctuation removal, special character handling").
    * **Tokenization:** How text is converted into numerical tokens (e.g., "Uses a custom vocabulary derived from training data," "Uses a pre-trained tokenizer like `WordPiece` for BERT").
    * **Vectorization:** How tokens are mapped to integer IDs.
    * **Padding/Truncation:** How sequences are handled to a fixed length (e.g., "Padded/truncated to a max length of 128 tokens").

---

### Training Pipeline

This section details how the models were trained and evaluated.

1.  **Environment Setup:**
    * Python dependencies: Install from `requirements_ml.txt` (or a specific `pyproject.toml` group).
        ```bash
        pip install -r requirements_ml.txt
        ```
    * Hardware: (e.g., "Training was conducted on a GPU-enabled machine with 16GB VRAM.")

2.  **Training Data:**
    * Location: (e.g., "Processed training data is located in `data/processed/`").
    * Format: (e.g., "JSONL files, each line containing `{'text': '...', 'label': ...}`").

3.  **Training Scripts:**
    * `scripts/train_topic_model.py`: Script for training the topic classifier.
        * Usage: `python scripts/train_topic_model.py --epochs 10 --batch_size 32`
        * Key Hyperparameters: (e.g., learning rate, optimizer, loss function).
    * `scripts/train_bias_model.py`: Script for training the bias detector.
        * Usage: `python scripts/train_bias_model.py --epochs 5 --dropout 0.2`
        * Key Hyperparameters: (e.g., learning rate, optimizer, loss function).

4.  **Evaluation & Metrics:**
    * Evaluation Dataset: (e.g., "A separate held-out test set of 5000 samples.")
    * Metrics tracked: (e.g., "Accuracy, F1-score (macro), Precision, Recall for topic classification.").
    * Validation splits strategy: (e.g., "80/10/10 train/validation/test split").

---

### Model Deployment & Inference

* **ONNX Conversion:**
    * Trained models are converted to ONNX format to be compatible with `onnxruntime-web`.
    * The conversion script is located at `scripts/export_to_onnx.py`.
    * Usage:
        ```bash
        python scripts/export_to_onnx.py --model_type topic --output_path models/topic_model.onnx
        python scripts/export_to_onnx.py --model_type bias --output_path models/bias_model.onnx
        ```
* **Browser Inference:**
    * Models are loaded in the browser using `onnxruntime-web`.
    * Input text is preprocessed (tokenized and vectorized) in JavaScript (`src/ml/text_vectorizer.ts`).
    * The `ort.InferenceSession.create()` method is used to load the `.onnx` files from `chrome.runtime.getURL()`.
    * Inference logic is handled in `src/ml/model_runner.ts` (e.g., `runTopicModel`, `runBiasModel`).
    * The browser's WebAssembly environment performs the tensor computations.

---

### Model Versioning

* Trained and exported `.onnx` models are typically versioned based on training runs or significant updates.
* New models are named `topic_model_ACCURACY.onnx` (e.g., `topic_model_0.8500.onnx`).
* The system automatically picks the highest accuracy model present in the `models/` directory.
